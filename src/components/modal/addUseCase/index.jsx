import Card from "../../card";
import style from "./index.module.sass";
import closeModal from "../../../assets/icons/close-modal.svg";
import chavronIcon from "../../../assets/icons/chavron.svg";
import selectIcon from "../../../assets/icons/select.svg";
import Button from "../../button";
import Modal, { ModalBody } from "..";
import { useEffect, useRef, useState } from "react";
import usecasesDb from "../../../utilities/static-usecases.json";
import { useDispatch, useSelector } from "react-redux";
import { addUsecase } from "../../../app/features/usecaseSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function AddUseCase(props) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const usecases = useSelector((state) => state.usecases.usecases);
  const [selectedUseCase, setSelectedUseCase] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        setOpenDropDown(!openDropDown);
      } else {
        setOpenDropDown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropDown]);

  const notAddedUsecases = usecasesDb.filter(({ id }) => {
    let isPresent = false;
    for (const { usecaseId } of usecases) {
      if (usecaseId === id) {
        isPresent = true;
      }
    }
    return !isPresent;
  });

  const onSaveUsecase = () => {
    setIsLoading(true);
    dispatch(
      addUsecase({
        usecaseId: selectedUseCase.id,
      })
    )
      .then(unwrapResult)
      .then(() => {
        toast(`${selectedUseCase.name} Use Case Added Successfully`, {
          type: "success",
        });
      })
      .catch((err) => {
        if (err.name !== "ConditionError") {
          toast(err.message, { type: "error" });
        }
      })
      .finally(() => {
        setIsLoading(false);
        props.onClose();
      });
  };

  return (
    <Modal>
      <ModalBody>
        <Card className={style["modal-content"]}>
          <div className={style["modal-header"]}>
            <h3 className={style["modal-header__title"]}>Add Use Case</h3>
            <button
              className={style["modal-header__close"]}
              onClick={props.onClose}
              disabled={isLoading}
            >
              <img src={closeModal} width={40} height={40} alt="close-modal" />
            </button>
          </div>
          <div className={style["select-usecase-form"]}>
            <span>Use Case</span>
            <div ref={ref}>
              <div className={style["dropdown-ctn"]}>
                <div className={style["dropdown-ctn__select"]}>
                  <span
                    className={style["dropdown-ctn__select__placeholder"]}
                    style={{ display: !selectedUseCase ? "initial" : "none" }}
                  >
                    Select use case
                  </span>
                  <span
                    className={style["dropdown-ctn__select__name"]}
                    style={{ display: selectedUseCase ? "initial" : "none" }}
                  >
                    {selectedUseCase && selectedUseCase.name}
                  </span>
                  {
                    <span
                      className={style["dropdown-ctn__select__status"]}
                      style={{
                        display:
                          selectedUseCase && selectedUseCase.isComingSoon
                            ? "initial"
                            : "none",
                      }}
                    >
                      (Coming Soon)
                    </span>
                  }
                </div>
                <img
                  src={chavronIcon}
                  width={10}
                  height={10}
                  alt="chavron"
                  className={
                    openDropDown
                      ? `${style["dropdown-icon"]} ${style["open"]}`
                      : style["dropdown-icon"]
                  }
                />
              </div>
              <ul
                className={style["dropdown-options"]}
                style={{ display: openDropDown ? "flex" : "none" }}
              >
                {notAddedUsecases.map((usecase) => (
                  <li
                    className={
                      selectedUseCase && usecase.id === selectedUseCase.id
                        ? `${style["dropdown-options__selection"]} ${style["selected"]}`
                        : style["dropdown-options__selection"]
                    }
                    key={usecase.id}
                    onClick={() => {
                      setSelectedUseCase({
                        id: usecase.id,
                        name: usecase.name,
                        isComingSoon: usecase.isComingSoon,
                      });
                    }}
                  >
                    <div className={style["dropdown-options__selection__info"]}>
                      <span
                        className={
                          style["dropdown-options__selection__info__name"]
                        }
                      >
                        {usecase.name}
                      </span>
                      {usecase.isComingSoon && (
                        <span
                          className={
                            style["dropdown-options__selection__info__status"]
                          }
                        >
                          (Coming Soon)
                        </span>
                      )}
                    </div>
                    <img src={selectIcon} alt="selected icon" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style["btn-container"]}>
            <Button
              className={style["btn-cancel"]}
              onClick={props.onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className={style["btn-submit"]}
              onClick={onSaveUsecase}
              disabled={!selectedUseCase}
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}
export default AddUseCase;

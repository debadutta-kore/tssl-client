import Card from "../../card";
import style from "./index.module.sass";
import closeModal from "../../../assets/icons/close-modal.svg";
import chavronIcon from "../../../assets/icons/chavron.svg";
import selectIcon from "../../../assets/icons/select.svg";
import Button from "../../button";
import Modal, { ModalBody } from "..";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsecase } from "../../../app/features/usecaseSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import request from "../../../utilities/request";
import LoadingSpinner from "../../loadingSpinner";

function AddUseCase(props) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState();
  const [availableUsecases, setAvailableUsecases] = useState([]);
  const [isSubmitting, setSumbmitting] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const usecases = useSelector((state) => state.usecases.usecases);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        setOpenDropDown((openDropDown) => !openDropDown);
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
  }, []);

  useEffect(() => {
      setLoading(true);
      const controller = new AbortController();
      request({
        url: "/usecase/available",
        method: "GET",
        signal: controller.signal
      })
        .then((res) => {
          setAvailableUsecases(res.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            dispatch({ type: "reset" });
            toast("Your session has expired", { type: "error" });
          } else {
            toast("Something Went Wrong", { type: "error" }); 
          }
        });
      return () => {
        controller.abort();
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notAddedUsecases = availableUsecases.filter(({ id }) => {
    let isPresent = false;
    for (const { usecaseId } of usecases) {
      if (usecaseId === id) {
        isPresent = true;
      }
    }
    return !isPresent;
  });

  const onSaveUsecase = () => {
    setSumbmitting(true);
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
        setSumbmitting(false);
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
              disabled={isSubmitting}
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
              {openDropDown && (
                <ul
                  className={style["dropdown-options"]}
                  style={
                    isLoading || notAddedUsecases ? { height: "190px" } : {}
                  }
                >
                  {notAddedUsecases.length > 0 ? (
                    notAddedUsecases.map((usecase) => (
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
                        <div
                          className={style["dropdown-options__selection__info"]}
                        >
                          <span
                            className={
                              style["dropdown-options__selection__info__name"]
                            }
                          >
                            {usecase.name}
                          </span>
                          {usecase.isComingSoon === 1 && (
                            <span
                              className={
                                style[
                                  "dropdown-options__selection__info__status"
                                ]
                              }
                            >
                              (Coming Soon)
                            </span>
                          )}
                        </div>
                        <img src={selectIcon} alt="selected icon" />
                      </li>
                    ))
                  ) : (
                    <li className={style["dropdown-options__emptyplaceholder"]}>
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <span style={{ color: "#667085" }}>
                          No use case is available yet
                        </span>
                      )}
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className={style["btn-container"]}>
            <Button
              className={style["btn-cancel"]}
              onClick={props.onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className={style["btn-submit"]}
              onClick={onSaveUsecase}
              disabled={!selectedUseCase}
              isLoading={isSubmitting}
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

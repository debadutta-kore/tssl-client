import Card from "../../card";
import style from "./index.module.sass";
import closeModal from "../../../assets/icons/close-modal.svg";
import chavronIcon from "../../../assets/icons/chavron.svg";
import selectIcon from "../../../assets/icons/select.svg";
import Button from "../../button";
import Modal from "..";
import { useState } from "react";
import usecasesDb from "../../../utilities/static-usecases.json";
import { useDispatch, useSelector } from "react-redux";
import { addUsecase } from "../../../app/features/usecaseSlice";

function AddUseCase(props) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState();
  const isLoading = useSelector((state)=>state.usecases.isLoading);
  const dispatch = useDispatch();
  
  const onSelectUsecase = (usecase)=>{
    setSelectedUseCase(usecase);
    setOpenDropDown(false);
  }
  
  const onSaveUsecase = ()=>{
    dispatch(addUsecase({
      usecaseId: selectedUseCase.id
    })).then(()=>{
      props.onClose();
    });
  }

  return (
    <Modal>
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
          <div
            className={style["dropdown-ctn"]}
            onClick={() => setOpenDropDown(!openDropDown)}
          >
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
              {<span
                className={style["dropdown-ctn__select__status"]}
                style={{ display: selectedUseCase && selectedUseCase.isComingSoon ? "initial" : "none" }}
              >
                (Coming Soon)
              </span>}
            </div>
            <button
              className={style["chavron-btn"]}
              type="button"
              onClick={() => setOpenDropDown(!openDropDown)}
            >
              <img src={chavronIcon} width={10} height={10} alt="chavron" />
            </button>
          </div>
          <ul
            className={style["dropdown-options"]}
            style={{ display: openDropDown ? "flex" : "none" }}
          >
            {usecasesDb.map((usecase) => (
              <li
                className={(selectedUseCase && usecase.id === selectedUseCase.id) ? `${style["dropdown-options__selection"]} ${style['selected']}`: style["dropdown-options__selection"]}
                key={usecase.id}
                onClick={onSelectUsecase.bind(null,{id: usecase.id, name: usecase.name, isComingSoon: usecase.isComingSoon})}
              >
                <div className={style["dropdown-options__selection__info"]}>
                  <span
                    className={style["dropdown-options__selection__info__name"]}
                  >
                    {usecase.name}
                  </span>
                  <span
                    className={
                      style["dropdown-options__selection__info__status"]
                    }
                    style={{
                      visibility: usecase.isComingSoon ? "visible" : "hidden",
                    }}
                  >
                    (Coming Soon)
                  </span>
                </div>
                <img src={selectIcon} alt="selected icon" />
              </li>
            ))}
          </ul>
        </div>
        <div className={style["btn-container"]}>
          <Button className={style["btn-cancel"]} onClick={props.onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button className={style["btn-submit"]} onClick={onSaveUsecase}>Save</Button>
        </div>
      </Card>
    </Modal>
  );
}
export default AddUseCase;

import Button from "../../../components/button";
import Card from "../../../components/card";
import style from "./index.module.sass";
import illustration from "../../../assets/Illustration.svg";
import { connect, useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchAllUsecases } from "../../../app/features/usecaseSlice";
import { useOutletContext } from "react-router-dom";
import UsecaseSetting from "../../../components/card/usecaseSetting";
import LoadingSpinner from "../../../components/loadingSpinner";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function Component(props) {
  const { setAddUsecase } = useOutletContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsecases())
      .then(unwrapResult)
      .catch((err) => {
        if (err.name !== "ConditionError") {
          toast(err.message, { type: "error" });
        }
      });
  }, [dispatch]);
  return (
    <>
      {props.usecases.length > 0 ? (
        <ul className={style["usecase-setting-list"]}>
          {props.usecases.map((usecase,index) => (
            <li key={usecase.id} className={style["usecase-setting"]}>
              <UsecaseSetting {...usecase} animationDelay={`${index/props.usecases.length}s`}/>
            </li>
          ))}
        </ul>
      ) : !props.isLoading ? (
        <div className={style["emptyUseCasecontainer"]}>
          <Card className={style["emptyUseCase"]}>
            <div className={style["emptyUseCase__placeholder"]}>
              <img src={illustration} width={200} height={100} />
              <h3>No Use-Cases Added Yet!</h3>
              <h4>To add use-case press on the below button</h4>
              <Button onClick={() => setAddUsecase(true)}>Add Use Case</Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state)=>({
  usecases: state.usecases.usecases,
  isLoading: state.usecases.isLoading,
});
const UseCaseSettings = connect(mapStateToProps)(Component);
export default UseCaseSettings;

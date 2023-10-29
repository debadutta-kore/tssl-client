import Button from "../../../components/button";
import Card from "../../../components/card";
import style from "./index.module.sass";
import illustration from "../../../assets/Illustration.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsecases } from "../../../app/features/usecaseSlice";
import { useOutletContext } from "react-router-dom";
import UsecaseSetting from "../../../components/card/usecaseSetting";
function UseCaseSettings() {
  const usecases = useSelector((state) => state.usecases.usecases);
  const { setAddUsecase } = useOutletContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsecases());
  }, [dispatch]);
  return (
    <>
      {usecases.length === 0 ? <div className={style['emptyUseCasecontainer']}>
        <Card className={style["emptyUseCase"]}>
          <div className={style["emptyUseCase__placeholder"]}>
            <img src={illustration} width={200} height={100} />
            <h3>No Use-Cases Added Yet!</h3>
            <h4>To add use-case press on the below button</h4>
            <Button onClick={() => setAddUsecase(true)}>Add Use Case</Button>
          </div>
        </Card>
      </div> : <ul className={style['usecase-setting-list']}>
        {usecases.map((usecase) => (<li key={usecase.id} className={style['usecase-setting']}>
          <UsecaseSetting {...usecase} />
        </li>))}
      </ul>}
    </>
  );
}

export default UseCaseSettings;

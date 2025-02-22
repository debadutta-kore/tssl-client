import style from "./index.module.sass";
import illustration from "../../assets/Illustration.svg";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchAllUsecases } from "../../app/features/usecaseSlice";
import UseCaseCard from "../../components/card/usecaseCard";
import comingSoon from "../../assets/icons/coming-soon.svg";
import HomeLayout from "../../components/layout/homeLayout";
import AddUseCase from "../../components/modal/addUseCase";
import LoadingSpinner from "../../components/loadingSpinner";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function Component(props) {
  const [addUsecase, setAddUsecase] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsecases())
      .then(unwrapResult)
      .catch((err) => {
        if (err.name !== "ConditionError") {
          toast(err.message, { type: "error" });
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const filteredUsecase = props.usecases.filter(({ enable }) => enable === 1);
  let placeHolder;
  if (filteredUsecase.length === 0) {
    if (props.isLoading) {
      placeHolder = (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    } else {
      if (props.role === "admin") {
        placeHolder = (
          <div className={style["placeholder"]}>
            <img src={illustration} width={200} height={100} />
            <h3>No Use-Cases Added Yet!</h3>
            <h4>To add use-case press on the below button</h4>
            <Button onClick={() => setAddUsecase(!addUsecase)}>
              Add Use Case
            </Button>
          </div>
        );
      } else {
        placeHolder = (
          <div className={style["placeholder"]}>
            <img
              src={comingSoon}
              alt="coming-soon"
              width={100}
              height={100}
              className={style["coming-soon-img"]}
            />
            <h3>Coming Soon!</h3>
          </div>
        );
      }
    }
  }
  return (
    <HomeLayout>
      {addUsecase && <AddUseCase onClose={() => setAddUsecase(!addUsecase)} />}
      {filteredUsecase.length === 0 ? (
        placeHolder
      ) : (
        <ul
          className={
            filteredUsecase.length > 2
              ? style["usecases-grid-container-lg"]
              : style["usecases-grid-container-sm"]
          }
        >
          {filteredUsecase.map((usecase, index) => (
            <li key={usecase.id} className={style["usecase-item"]}>
              <UseCaseCard
                {...usecase}
                animationDelay={`${index / filteredUsecase.length}s`}
              />
            </li>
          ))}
        </ul>
      )}
    </HomeLayout>
  );
}

const mapStateToProp = (state)=>({
  usecases: state.usecases.usecases,
  isLoading: state.usecases.isLoading,
  role: state.auth.role,
});

const Home =  connect(mapStateToProp)(Component);
export default Home;

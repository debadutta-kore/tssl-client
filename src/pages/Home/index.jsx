import style from "./index.module.sass";
import illustration from "../../assets/Illustration.svg";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsecases } from "../../app/features/usecaseSlice";
import UseCaseCard from "../../components/card/usecaseCard";
import comingSoon from "../../assets/icons/coming-soon.svg";
import HomeLayout from "../../components/layout/homeLayout";
import AddUseCase from "../../components/modal/addUseCase";
import LoadingSpinner from "../../components/loadingSpinner";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function Home() {
  const { role, usecases, isLoading } = useSelector((state) => ({
    usecases: state.usecases.usecases,
    isLoading: state.usecases.isLoading,
    role: state.auth.role,
  }));
  const [addUsecase, setAddUsecase] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsecases())
      .then(unwrapResult)
      .catch((err) => {
        toast(err.message, { type: "error" });
      });
  }, [dispatch]);

  const filteredUsecase = usecases.filter(({ enable }) => enable === 1);
  let placeHolder;
  if (filteredUsecase.length === 0) {
    if (isLoading) {
      placeHolder = (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    } else {
      if (role === "admin") {
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
          {filteredUsecase.map((usecase) => (
            <li key={usecase.id} className={style["usecase-item"]}>
              <UseCaseCard {...usecase} />
            </li>
          ))}
        </ul>
      )}
    </HomeLayout>
  );
}
export default Home;

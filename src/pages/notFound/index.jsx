import Button from "../../components/button";
import style from "./index.module.sass";
import notFoundImage from "../../assets/404-not-found.svg";
import backIcon from "../../assets/icons/Arrow Back.svg";
import HomeLayout from "../../components/layout/homeLayout";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={style['not-found-container']}>
        <img src={notFoundImage} alt="not-found" className={style['not-found-img']}/>
        <h1 className={style["title"]}>Page Not found</h1>
        <h5 className={style["sub-title"]}>
          Sorry, the page you are looking for doesn’t exist. Here are some
          helpful links:
        </h5>
        <div className={style['btn-container']}>
          <Button type="button" onClick={() => navigate(-1)}>
            <img src={backIcon} width={20} height={20} />
            <span>Go Back</span>
          </Button>
          <Button type="button" onClick={() => navigate('/home', { replace: true })}>Take Home</Button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default NotFound;

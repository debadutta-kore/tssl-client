import Card from "../../components/card";
import shieldIcon from '../../assets/icons/shield.svg';
import successfulIcon from '../../assets/icons/successful.svg';
import closeIcon from '../../assets/icons/close-modal.svg';
import { Link } from "react-router-dom";
import style from './index.module.sass';
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import Button from "../../components/button";
function ResetPassword(){
    return <Card className={style['resetPasswordLayout']}>
        <Link to="../login" className={style['close-btn']}>
                <img src={closeIcon} alt="close-btn"/>
        </Link>
        <div className={style['resetPasswordLayout__header']}>
            <div className={style["resetPasswordLayout__header__common"]}>
                <img src={shieldIcon} alt="shield-icon" width={16} height={16}/>
                <h3>Reset your Password</h3>
            </div>
            {/* <div className={style["resetPasswordLayout__header__successful"]}>
                <img src={successfulIcon} alt="successful-icon" width={16} height={16}/>
                <h3>Successful!</h3>
                <h5>Your password has been reset successfully.</h5>
                <Button>Ok</Button>
            </div> */}
        </div>
        <Formik initialValues={{email:''}}>
            <Form className={style['reset-form']}>
                <InputField  type="email" label="Email ID" placeholder="Enter Email ID" name="email"/>
                <div className={style["btn-container"]}>
                    <Button>Cancel</Button>
                    <Button type="submit">Reset</Button>
                </div>
            </Form>
        </Formik>
        {/* <Formik initialValues={{
            currentPass:'',
            newPass:'',
            confirmPass:''
        }}>
            <Form className={style['reset-form']} style={{display:'none'}}>
                <InputField type="password" label="Current Password" placeholder="Enter Current Password" name="currentPass"/>
                <InputField type="password" label="New Password" placeholder="Enter New Password" name="newPass"/>
                <InputField type="password" label="Confirm Password" placeholder="Confirm Password" name="confirmPass"/>
                <div className={style["btn-container"]}>
                    <Button>Cancel</Button>
                    <Button type="submit">Reset</Button>
                </div>
            </Form>
        </Formik> */}
    </Card>
}

export default ResetPassword;
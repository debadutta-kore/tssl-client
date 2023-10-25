import Card from '..';
import style from './index.module.sass';
import deleteIcon from '../../../assets/icons/delete.svg';
import Switch from '../../switch';
import { useRef, useState } from 'react';
import usecaseDb from '../../../utilities/static-usecases.json';
import ConfirmDeleteUsecase from '../../modal/confirmations/ConfirmdeleteUsecase';
import { useDispatch } from 'react-redux';
import { updateUsecase } from '../../../app/features/usecaseSlice';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
function UsecaseSetting(props) {
    const ref = useRef();
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);

    const info = usecaseDb.find((usecase) => usecase.id === props.usecaseId);
    const onChangeStatus = () => {
            const status = ref.current.checked ? 'enabled' :'disabled';
            dispatch(updateUsecase({
                id: info.id,
                enable: ref.current.checked
            }))
            .then(unwrapResult)
            .then(() => {
                toast(`${info.name} usecase is successfully ${status}`,{type:'warning'});
            }).catch(() => {
                toast(`Unable to ${status} ${info.name} usecase`,{type:'error'});
            });
    }

    return <Card className={style['setting-cards']}>
        {isDelete && <ConfirmDeleteUsecase delete={{ id: props.id, name: info.name }} onClose={() => setIsDelete(!isDelete)} />}
        <div className={style['card-heading']}>
            <div>
                <span>{info.name}</span>
            </div>
            <div>
                <Switch onChange={onChangeStatus} ref={ref} checked={props.enable === 1 ? true : false} />
                <button onClick={() => setIsDelete(!isDelete)}>
                    <img src={deleteIcon} alt='delete' width={20} height={20} />
                </button>
            </div>
        </div>
    </Card>
}
export default UsecaseSetting;
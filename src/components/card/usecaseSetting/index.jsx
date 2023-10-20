import Card from '..';
import style from './index.module.sass';
import deleteIcon from '../../../assets/icons/delete.svg';
import Switch from '../../switch';
import { useRef, useState } from 'react';
import usecaseDb from '../../../utilities/static-usecases.json';
import ConfirmDeleteUsecase from '../../modal/confirmations/ConfirmdeleteUsecase';
function UsecaseSetting(props){
    const ref = useRef();
    const [isDelete, setIsDelete] = useState(false);
    const info = usecaseDb.find((usecase)=>usecase.id === props.usecaseId);
    return <Card className={style['setting-cards']}>
        {isDelete && <ConfirmDeleteUsecase delete={{id:props.id, name: info.name}} onClose={()=>setIsDelete(!isDelete)}/>}
        <div className={style['card-heading']}>
            <div>
                <span>{info.name}</span>
            </div>
            <div>
                <Switch ref={ref}/>
                <button onClick={()=>setIsDelete(!isDelete)}>
                    <img src={deleteIcon} alt='delete' width={20} height={20}/>
                </button>
            </div>
        </div>
    </Card>
}
export default UsecaseSetting;
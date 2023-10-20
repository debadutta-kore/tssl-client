import Modal from '..';
import Card from '../../card';
import style from './index.module.sass';
function Confirm(props) {
    return <Modal><Card className={style['modal-content']}>
        {props.children}
    </Card>
    </Modal>
}

export default Confirm;
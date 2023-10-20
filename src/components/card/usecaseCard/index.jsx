import Card from '..';
import style from './index.module.sass';
import usecaseDb from '../../../utilities/static-usecases.json';
function UseCaseCard(props) {
    const info = usecaseDb.find((usecase) => usecase.id === props.usecaseId);
    return <Card className={style['usecaseCard']}>
        <div className={style['overlay']} style={{ background: info.background }}></div>
        <div className={style['card-content']} style={{padding: info.icon?'initial':'50px'}}>
            {info.icon && <img src={info.icon} width={80} height={80} />}
            <h3>{info.name}</h3>
        </div>
        {info.isComingSoon && <span>Coming soon</span>}
    </Card>
}

export default UseCaseCard;
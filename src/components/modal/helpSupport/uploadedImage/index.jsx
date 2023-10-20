import imgPlaceholder from '../../../../assets/icons/image-placeholder.svg';
import deleteImage from '../../../../assets/icons/close-modal.svg';
import style from './index.module.sass';
function UploadedImage(props){
    const [name,ext] = props.name.split('.');
    const imgName = name.substr(0,6)+(name.length<=6?('.'+ext):('...'+ext));
    return <li className={style['upload-img-holder']}>
        <div className={style['img-overlay']}>
            <img src={imgPlaceholder} alt='img-placeholder' width={20} height={20}/>
            <span>{imgName}</span>
        </div>
        <button>
            <img src={deleteImage} alt={'delete-img'} width={30} height={30}/>
        </button>
        <img src={props.url} alt={props.name} className={style['original-img']} width={90} height={90}/>
    </li>
}

export default UploadedImage;
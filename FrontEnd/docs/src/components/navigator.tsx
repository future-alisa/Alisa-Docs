import styles from '../css/common.module.scss';
function MyCircyIcon(){
    return <button className={styles.btn}>but1</button>
}

export default function MyNavigator(){
    return (
        <div className={styles.nav}>
            <MyCircyIcon></MyCircyIcon>
        </div>
    );
}
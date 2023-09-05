import styles from '../css/common.module.scss';

interface props{
    users:user[]
}

interface user{
    key:number
    name:string
}

function MyCircyIcon({name}:{name:string}){
    return <button className={styles.btn}>{name}</button>
}

export default function MyNavigator({users}:props){
    const children=users.map(x=> <MyCircyIcon key={x.key} name={x.name}></MyCircyIcon>)
    return (
    <div className={styles.nav}>
        {children}
    </div>
    );
}
import style from "./UserCard.module.css"
function UserCard({userName,name,avatar,email,phone,status,dateCreated}){

    return(
        <article className={style['user-card']}>
            <header className={style['user-card-header']}>
                <img 
                className={style['user-card-avatar']}
                alt="Avatar user" 
                src={avatar}/>
            <div className={style['user-card-info']}>
                <strong>{name}</strong>
                <span className={style['user-card-infoUsername']}>{userName}</span>
                <span className={style['user-card-infoUsername']}>{email}</span>
            </div>
            </header>
            <aside className={style['user-card-aside']}>
                <span className={style['user-card-status']}>{status}</span>
                <button className={style['card-user-btnVermas']}>
                    ver mas
                </button>
            </aside>
        </article>
    )
}
export default UserCard;
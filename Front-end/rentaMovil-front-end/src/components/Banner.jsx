    import '../components/Banner.css'

    function Banner({imgs,text}){
        return(
    <div className="container-banner">
            <div className="slides">
                {imgs.map((img, i) => (
                    <div className="slide" key={i}>
                        <img src={img} alt={`imagen ${i}`} />
                    </div>
                ))}
        
        </div>
        <p className="text-banner">{text}</p>
    </div>
        );
    }
    export default Banner;
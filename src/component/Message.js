
import Leader from "./messages/Leader";
import Strategic from "./messages/Strategic";
import Executive from "./messages/Executive";
import Business from "./messages/Business";
import Innovation from "./messages/Innovation";
import Network from "./messages/Network";
import Cultural from "./messages/Cultural";
import Personal from "./messages/Personal";
import Global from "./messages/Global";
import Mentorship from "./messages/Mentorship";



const Message = ({close, msg, p, submit, quest}) => {

    if (p === 'Leadership Development'){

        return ( 
            <Leader close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Strategic Thinking'){

        return ( 
            <Strategic close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }
      
    if (p === 'Executive Presence'){

        return ( 
            <Executive close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Business Acumen'){

        return ( 
            <Business close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Innovation and Agility'){

        return ( 
            <Innovation close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Network & Industry Influence'){

        return ( 
            <Network close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Cultural Alignment and Integrity'){

        return ( 
            <Cultural close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Personal Growth and Continuous Learning'){

        return ( 
            <Personal close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Global Perspective'){

        return ( 
            <Global close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

    if (p === 'Mentorship and Succession Planning'){

        return ( 
            <Mentorship close={close} msg={msg} submit={submit} quest={quest}/>
        );
    }

      
}
 
export default Message;
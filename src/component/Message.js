import Leader from "./messages/Leader";
import Strategic from "./messages/Strategic";
import Executive from "./messages/Executive";
import Business from "./messages/Business";
import Innovation from "./messages/Innovation";
import Network from "./messages/Network";
import Mentorship from "./messages/Mentorship";
import Cultural from "./messages/Cultural";
import './messages/Message.css'

const Message = ({close, msg, p, submit, quest}) => {

    if (p === 'Identity Clarity') {
        return (<Leader close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Value Articulation') {
        return (<Strategic close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Evidence Visibility') {
        return (<Executive close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Signature Strength Recognition') {
        return (<Business close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Trust Pattern Awareness') {
        return (<Innovation close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Positioning Strength') {
        return (<Network close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Next-Move Clarity') {
        return (<Mentorship close={close} msg={msg} submit={submit} />);
    }
    if (p === 'Leverage Utilization') {
        return (<Cultural close={close} msg={msg} submit={submit} />);
    }
}

export default Message;

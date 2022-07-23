import { closeModal } from "./onOpenCard";
import { backdrop } from "./onOpenCard";

backdrop.addEventListener('click', onClickBackdrop)
function onClickBackdrop(event) {    
    if (event.currentTarget === event.target) {
        closeModal()
    }
}

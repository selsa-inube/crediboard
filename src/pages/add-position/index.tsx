import { useParams } from "react-router-dom";

export function AddPosition() {
    const {id} = useParams();

    console.log("id: ", id)

    return <></>
}
import { Button } from "./Button"
import { PlusIcon } from "./icons/PlusIcon"
// import { ShareIcon } from "./icons/ShareIcon";

interface NavBarProps {
  title: string;
  onAddContent:()=>void
}

export const NavBar = (props:NavBarProps) => {
    
    // const shareBrain = () => {
    //     console.log("Share your brain link")
    // }
    return (
        <div className="flex flex-row justify-between gap-auto items-center mb-4">
            <div>
                <h2 className="text-2xl text-white font-bold">{props.title}</h2>
            </div>

            <div className="flex flex-row justify-center gap-4 items-center">
                <Button 
                    variant= "primary"
                    size = "md"
                    text = "Add Content"
                    startIcon = <PlusIcon/>
                    onClick = {props.onAddContent}
                />
                {/* <Button 
                    variant= "secondary"
                    size = "md"
                    text = "Share Brain"
                    startIcon = <ShareIcon/>
                    onClick = {shareBrain}
                /> */}

            </div>

        </div>
    )
}
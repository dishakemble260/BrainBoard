import { CreateContentForm } from "./CreateContentForm";
import { CancelIcon } from "./icons/CancelIcon";

interface Props {
  open: boolean;
  onClose: ()=>void;
  contentId?: string;
}

export const CreateContentModal = ({ open, onClose,contentId }: Props) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 flex flex-col justify-between items-center">
            <div className="w-full flex justify-end cursor-pointer hover:text-[#A084E8]" onClick={onClose}>
              <CancelIcon />
            </div>
            <div>
              <CreateContentForm contentId={contentId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

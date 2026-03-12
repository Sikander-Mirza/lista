import { Eye, EyeOff } from 'lucide-react';

const ShowPassIcon = ({ ShowPass , SetShowPass }) => {
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    SetShowPass((prev) => !prev);
                }}
                className="absolute right-4 sm:right-6 text-[#747474] top-[48px] sm:top-[50px] transform -translate-y-1/2 cursor-pointer"
            >
                {ShowPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </>
    )
}

export default ShowPassIcon
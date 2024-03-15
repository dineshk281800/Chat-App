import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation'

const Conversation = ({ conversation, lastIndex, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === Conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(Conversation._id);
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar 
            ${isOnline ? "online" : ""}
            `}>
                    <div className='w-12 rounded-full'>
                        <img src={Conversation.profilePic} alt="user avatar" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{Conversation.fullname}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>
            {/* {!lastIndex && <div className='divider my-0 py-0 h-1'/>} */}
        </>
    )
}

export default Conversation


// const Conversation = () => {
//     return (
//         <>
//             <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
//             // onClick={()=> setSelectedConversation(conversation)}
//             >
//                 <div className={`avatar online`}>
//                     <div className='w-12 rounded-full'>
//                         <img alt="user avatar" />
//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-col flex-1'>
//                 <div className='flex gap-3 justify-between'>
//                     <p className='font-bold text-gray-200'>{Conversation.fullname}</p>
//                     <span className='text-xl'></span>
//                 </div>
//             </div>
//             <div className='divider my-0 py-0 h-1' />
//         </>
//     )
// }

// export default Conversation
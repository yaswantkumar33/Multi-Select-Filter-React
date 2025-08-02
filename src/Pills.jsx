import React from 'react';

const Pills = ({image, text, handleRemoveUser,user}) => {
    return (<div className="flex items-center gap-2 bg-black text-white px-4 py-[3px] h-[30px] justify-center rounded-full">
            <img src={image} alt={text} className="h-6 w-6 rounded-full"/>
            <span className="text-sm">{text}</span>
            <span className="ml-2 cursor-pointer font-bold text-white" onClick={()=>(handleRemoveUser(user))}> x
        </span>
        </div>);
};

export default Pills;

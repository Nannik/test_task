import React, {FC} from 'react';

type CollapseButtonProps = {
    onClick: () => void
}

const CollapseButton: FC<CollapseButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick}>Collapse</button>
    );
};

export default CollapseButton;
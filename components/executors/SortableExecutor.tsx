import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Contact, Executor } from '@/types';

interface SortableExecutorProps {
    executor: Executor;
    contact: Contact | undefined;
    index: number;
}

export const SortableExecutor: FC<SortableExecutorProps> = ({ executor, contact, index }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: executor.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 ${
                isDragging ? 'bg-blue-50 rounded-lg' : ''
            }`}
            {...attributes}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#047aff] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                            {index + 1}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-[17px] font-[500] text-[#1d1d1f]">
                            {contact ? contact.name : executor.contactId}
                        </h3>
                        <p className="text-[14px] text-gray-500">
                            {executor.type} • {index === 0 ? 'Albacea Principal' : `Suplente #${index}`}
                        </p>
                    </div>
                </div>
                <div 
                    className="flex items-center gap-2 cursor-move"
                    {...listeners}
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
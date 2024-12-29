import { Comment } from '@/types/supabase/guestbook-type'; // 타입 파일 경로 확인
import TrashCanIcon from './TrashCanIcon';

// CommentListProps 정의
interface CommentListProps {
  comments: Comment[];
  confirmDeleteComment: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, confirmDeleteComment }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="w-[700px] p-4 flex flex-col items-start rounded-xl mb-8 text-black bg-white shadow-md"
        >
          <div className="flex items-center">
            <img src={comment.users?.profile_img || ''} className="w-12 h-12 rounded-full" alt="프로필 사진" />
            <div className="pl-3 flex flex-col justify-start">
              <h1 className="font-semibold text-start">{comment.comment}</h1>
              <p className="text-sm text-gray-500">게스트북</p>
            </div>
          </div>

          <div className="w-full flex justify-between items-center pl-[60px] mt-2">
            <p className="text-sm text-gray-400">
              {new Date(comment.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            <button
              type="button"
              onClick={() => confirmDeleteComment(comment.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="댓글 삭제"
            >
              <TrashCanIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

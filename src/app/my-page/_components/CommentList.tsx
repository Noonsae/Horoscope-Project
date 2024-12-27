import { Comment } from '@/types/supabase/guestbook-type'; // 타입 파일 경로에 맞게 수정
import { default_profile_img } from 'images/default_profile_img.webp';
import TrashCanIcon from './TrashCanIcon';

// CommentListProps 정의
interface CommentListProps {
  comments: Comment[];
  newProfileImg: string | File | null;
  confirmDeleteComment: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, newProfileImg, confirmDeleteComment }) => {
  // 프로필 이미지 URL을 계산하는 함수
  const getProfileImgSrc = (): string => {
    if (typeof newProfileImg === 'string') {
      return newProfileImg;
    }
    if (newProfileImg instanceof File) {
      return URL.createObjectURL(newProfileImg);
    }
    return default_profile_img.src; // 기본 이미지 반환
  };

  const profileImgSrc = getProfileImgSrc();

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="w-[700px] p-4 flex flex-col items-start rounded-xl mb-8 text-black bg-white">
          <div className="flex items-center">
            <img
              src={comment.users?.profile_img || profileImgSrc}
              className="w-12 h-12 rounded-full"
              alt="프로필 사진"
            />
            <div className="pl-3 flex flex-col justify-start">
              <h1 className="font-semibold text-start">{comment.comment}</h1>
              <p>게스트북</p>
            </div>
          </div>

          <div className="w-full flex justify-between items-center pl-[60px] mt-2">
            <p>
              {new Date(comment.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            <button type="button" onClick={() => confirmDeleteComment(comment.id)}>
              <TrashCanIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

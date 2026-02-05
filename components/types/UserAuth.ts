export default interface UserDB {
  loading: boolean;
  user: UserMetadata;
}

interface UserMetadata {
  user_metadata: {
    email: string;
    full_name: string;
    avatar_url: string;
  };
}

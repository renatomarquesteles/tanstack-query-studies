import { ListUsers } from './components/list-users';
import { PostForm } from './components/post-form';
import { UserDetails } from './components/user-details';

export function App() {
  return (
    <div>
      <ListUsers />
      <br />
      <UserDetails />
      <br />
      <PostForm />
    </div>
  );
}

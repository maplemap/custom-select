import {CustomSelect} from '@/components/custom-select';
import {useUsers} from '@/modules/users/use-users';
import styles from './user-page.module.scss';

export const UserPage = () => {
  const {users} = useUsers();

  const handleSelectChange = (data) => {
    console.log('Chosen item', data); // eslint-disable-line no-console
  };

  return (
    <div>
      <div className={styles.selectContainer}>
        <h3>Custom Select Component</h3>
        <div className={styles.usersCount}>items: {users.length}</div>
        <CustomSelect options={users} onChange={handleSelectChange} />
      </div>
    </div>
  );
};

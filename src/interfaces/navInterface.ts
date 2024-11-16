export interface NavProps {
  userStatus: 'loggedOut' | 'generalUser' | 'adminUser';
  setIsModalOpen: (isOpen: boolean) => void;
}

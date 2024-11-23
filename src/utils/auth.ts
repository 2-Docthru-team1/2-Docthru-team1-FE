export const logout = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/';
};

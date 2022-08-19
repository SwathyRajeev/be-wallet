export const queryGetUserByUsername = (username: string) => {
  return `
          SELECT
            
            a.username,
            a.password,
            a.salt,
            a.user_id
          FROM
            auth a 
          WHERE a.username = '${username}' AND a.is_active = true
  `;
};
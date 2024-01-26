const sendPasswordByEmail = async (user) => {
    try {
      let msg = `Your Password for login : ${user.password}`;
      let mailObj = {
        subject: 'Your Password!',
        to: user.email,
        template: '/views/email/InitialPassword',
        data: { message:msg }
      };
      try {
        await emailService.sendMail(mailObj);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
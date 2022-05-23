import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, admin = null) {

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {

      dispatch(auth())
        .then(response => {
          if (!response.payload.isAuth) {
            if (option) {
              Navigate('/')
            }
          } else {
            if (admin && !response.payload.isAdmin) {
              Navigate('/')
            } else {
              if (option === false) {
                Navigate('/')
              }
            }
          }
        })

    }, []);

    return (
      <SpecificComponent />
    )
  }

  return <AuthenticationCheck />;
}
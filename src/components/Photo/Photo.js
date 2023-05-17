import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
const PATH = 'http://localhost:3000/assets/images/defaultUsers/';
const DEFAULT = '/assets/images/defaultUsers/default_doctor_avatar.jpg';


const { string, bool, oneOf } = PropTypes;


export const USERS_PHOTOS = {
    patient: {
        true: `${PATH}patientMale.png`,
        false: `${PATH}patientFemale.png`,
        undefined: DEFAULT,
    },
    resource: {
        true: `${PATH}doctorMale.png`,
        false: `${PATH}doctorFemale.png`,
        undefined: DEFAULT,
    },
};
export const PHOTO_TYPE = {
    PATIENT: 'patient',
    RESOURCE: 'resource',
};
const Photo = ({
    classImg,
    type,
    sex,
    url,
}) => {
    const derivedPhoto = USERS_PHOTOS[type][sex];

    return (
        <img src={derivedPhoto} className={classImg} alt="" />
    );
};
const propTypes = {
    url: string,
    classImg: string,
    type: oneOf(Object.values(PHOTO_TYPE)),
    sex: bool,
};

const defaultProps = {
    url: '',
    classImg: '',
    type: PHOTO_TYPE.RESOURCE,
    sex: undefined,
};
Photo.propTypes = propTypes;
Photo.defaultProps = defaultProps;

export default Photo;
import React from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';
import style from '../UserStory/style';

const UserProfileImage = (props) => {
    return (
        <View style={style.userImageContainer}>
            <Image source={props.profileImage} style={{width: props.imageDimensions, height : props.imageDimensions}} />
        </View>
      );
}

UserProfileImage.propTypes = {
    profileImage: PropTypes.any.isRequired,
    imageDimensions: PropTypes.number.isRequired
}

export default UserProfileImage;
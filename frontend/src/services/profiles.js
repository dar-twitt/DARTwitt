import api from './api';

export function getProfiles(){
    return api.get('profile/');
}

export function createProfile( name, surname){
    return api.post('profile/', {
            name: name,
            surname: surname
        }
    );
}

export function updateProfile(profile){
    return api.put(`profile/${profile.id}/`, {
        bio: profile.bio,
        name: profile.name,
        surname: profile.surname
    });
}

export function deleteProfile(profile){
    return api.delete(`profile/${profile.id}/`);
}

export function getProfilesFollowers(profile){
    return api.get(`profile/${profile.id}/followers/`);
}

export function getProfileFollowing(profile){
    return api.get(`profile/${profile.id}/following/`);
}

export function followProfile(yourProfile, anotherProfile){
    return api.post(`profile/${yourProfile.id}/follow/${anotherProfile.id}/`, {});
}

export function unfollowProfile(yourProfile, anotherProfile){
    return api.delete(`profile/${yourProfile.id}/follow/${anotherProfile.id}/`);
}

export function getOwnProfile() {
    return api.get('profile/own/');
}

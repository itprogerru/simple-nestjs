describe('my test', () => {
  it('return true', () => {
    expect(true).toEqual(true);
  });
});

class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found');
    }
    this.friends.splice(idx,1);
  }
}

describe('frindslist', () => {

  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  })

  it('initializes friend list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add a friend list', () => {
    friendsList.addFriend('jork');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('anniuns fredship', () => {
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('jork');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('jork');

  });

  describe('removeFriend', () => {
    it('remove a friend from the list', ()=> {
      friendsList.addFriend('jork');
      expect(friendsList.friends[0]).toEqual('jork');
      friendsList.removeFriend('jork');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throw an error', ()=> {
      expect(() => friendsList.removeFriend('jork').toThrow('test'));
    });
  })
})

import { user, game, GameUserSchema, Teacher, Action, GameUser } from "models";
import { nanoid } from "nanoid";

export async function createGame(
  startDate: Date,
  endDate: Date,
  startingValue: number,
  adminUserId: string,
  teachers?: Teacher[],
  actions?: Action[],
  users?: string[]
) {
  const adminUser = {
    user: adminUserId,
    points: 0,
    credits: startingValue,
  };
  let usersArray: GameUser[];
  if (users) {
    usersArray = await Promise.all(
      users.map(async (el) => {
        const User = await user.findOne({ username: el });
        return {
          user: User._id,
          points: 0,
          credits: startingValue,
        };
      })
    );
  }

  console.log();

  const Game = new game({
    game_id: nanoid(6),
    startDate: startDate,
    endDate: endDate,
    startingValue: startingValue,
    actions: actions ? actions : [],
    teachers: teachers ? teachers : [],
    users: users ? [adminUser, ...usersArray] : [adminUser],
    adminUserId: adminUserId,
  });

  await Game.save();

  return Game;
}

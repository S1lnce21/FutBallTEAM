const sequelize = require('./db');
const Team = require('./models/Team');
const Player = require('./models/Player');

Team.hasMany(Player, {
  foreignKey: 'teamId',
  as: 'players'
});
Player.belongsTo(Team, {
  foreignKey: 'teamId',
  as: 'team'
});

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const spartak = await Team.create({ name: 'Спартак', city: 'Москва' });
    const zenit = await Team.create({ name: 'Зенит', city: 'Санкт-Петербург' });

    await spartak.createPlayer({ firstName: 'Тео', lastName: 'Бонгонда', position: 'Нападающий', number: 11 });
    await spartak.createPlayer({ firstName: 'Роман', lastName: 'Зобнин', position: 'Полузащитник', number: 47 });
    await spartak.createPlayer({ firstName: 'Срджан', lastName: 'Бабич', position: 'Защитник', number: 6 });

    await zenit.createPlayer({ firstName: 'Александр', lastName: 'Соболев', position: 'Нападающий', number: 7 });
    await zenit.createPlayer({ firstName: 'Сергей', lastName: 'Волков', position: 'Защитник', number: 82 });
    await zenit.createPlayer({ firstName: 'Денис', lastName: 'Адамов', position: 'Вратарь', number: 16 });

    const teamsWithPlayers = await Team.findAll({
      include: [{
        model: Player,
        as: 'players'
      }]
    });

    console.log('--- Вывод всех команд и их игроков ---');
    teamsWithPlayers.forEach(t => {
      console.log(`\nКоманда: ${t.name} (${t.city})`);
      if (t.players.length > 0) {
        t.players.forEach(p => {
          console.log(`  - #${p.number} ${p.firstName} ${p.lastName} (${p.position})`);
        });
      } else {
        console.log('  - Нет игроков в базе.');
      }
    });

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
  }
}

main();
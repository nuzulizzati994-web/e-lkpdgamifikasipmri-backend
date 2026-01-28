const { where } = require("sequelize");
const User = require("../models/User");
const { hashPassword } = require("../utils/hash");
const { generateToken } = require("../utils/token");
const Progress = require("../models/Progress");

exports.signup = async (req, res) => {
  try {
    const user = req.body;

    console.log(req.body);

    if (!user.username || !user.password) {
      return res.status(400).json({
        status: "failed",
        message: "Username atau Password kosong!",
      });
    }

    const duplicate = await User.findOne({
      where: {
        username: user.username,
      },
    });

    if (duplicate) {
      return res.status(400).json({
        status: "failed",
        message: "Username sudah di pakai pengguna lain",
      });
    }

    const hashPass = hashPassword(user.password);

    const requestUser = await User.create({
      username: user.username,
      password: hashPass,
    });

    const token = generateToken({
      id: requestUser.id,
      username: user.username,
    });

    await User.update(
      {
        token,
      },
      {
        where: {
          id: requestUser.id,
        },
      }
    );

    await Progress.create({
      user_id: requestUser.id,
      data: {},
      point: {},
    });

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body;

    if (!user.username || !user.password) {
      return res.status(400).json({
        status: "failed",
        message: "Username atau Password kosong!",
      });
    }

    const userData = await User.findOne({
      where: {
        username: user.username,
      },
      raw: true,
    });
    console.log(userData);

    if (!userData) {
      return res.status(400).json({
        status: "failed",
        message: "Username atau Password salah!",
      });
    }

    const hashPass = hashPassword(user.password);
    if (hashPass !== userData.password) {
      return res.status(400).json({
        status: "failed",
        message: "Username Password salah!",
      });
    }

    const checkProgress = await Progress.findOne({
      where: {
        user_id: userData.id,
      },
    });

    if (!checkProgress) {
      await Progress.create({
        user_id: userData.id,
        data: "{}",
        point: "{}",
      });
    }

    const token = generateToken({
      id: userData.id,
      username: user.username,
    });

    await User.update(
      {
        token,
      },
      {
        where: {
          username: userData.username,
        },
      }
    );

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.logout = async (req, res) => {
  try {
    const { username } = req.user;

    const out = await User.update(
      {
        token: null,
      },
      {
        where: {
          username,
        },
      }
    );

    return res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.check = async (req, res) => {
  try {
    const { token } = req.body;

    const request = await User.findOne({
      where: {
        token,
      },
      raw: true,
    });

    if (!request) {
      return res.status(200).json({
        status: "failed",
      });
    }

    const progress = await Progress.findOne({
      where: {
        user_id: request.id,
      },
      raw: true,
    });

    console.log(progress);

    return res.status(200).json({
      status: "success",
      username: request.username,
      progress: {
        data: progress.data,
        points: progress.point,
        stage: progress.stage,
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

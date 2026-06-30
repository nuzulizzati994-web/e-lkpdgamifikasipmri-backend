const Progress = require("../models/Progress");

exports.save = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    const { caseId, data, point, stage } = req.body;

    const get = await Progress.findOne({
      where: {
        user_id: id,
      },
      raw: true,
    });

    console.log(get);

    const newData = get.data;
    newData["case" + caseId] = {
      ...(newData["case" + caseId] || {}),
      ...data,
    };

    const newPoint = get.point;
    newPoint["case" + caseId] = {
      ...(newPoint["case" + caseId] || {}),
      ...point["case" + caseId],
    };

    const body = {
      data: newData,
      point: newPoint,
    };

    if (stage) body.stage = stage;

    const request = await Progress.update(body, {
      where: {
        user_id: id,
      },
    });

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.export = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // if (authHeader != "udangKejuTepungGoreng") {
    //   return res.status(400).json({
    //     status: "failed",
    //   });
    // }

    const request = await Progress.findAll({
      include: [
        {
          association: "users",
          attributes: ["username"],
        },
      ],
      raw: true,
    });

    const result = request.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      name: item["users.username"],
      data: Object.entries(item.data).filter(([key, value]) => key !== 'case0').map(([key, i]) => {
          return i;
      }),
    }));

    console.dir(result, {depth: null, colors: true});
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// exports

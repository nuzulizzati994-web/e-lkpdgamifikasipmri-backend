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
      status: 'success'
    })
  } catch (error) {
    console.error("Error:", error);
  }
};

// exports

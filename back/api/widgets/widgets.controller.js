const widgetsApi = require('../../services/widgets');
const {WidgetModel} = require('../../models/Widget');
const User = require('../../models/User');
const jwt = require('../../services/jwt');
const ObjectId = require('mongoose').Types.ObjectId;

const getAllWidgetsConf = (req, res) => {
    return res.status(200).json({widgets: widgetsApi.getAllDefaultWidgets()});
}

const createWidget =  async(req, res) => {
    let userToken = jwt.getTokenFromRequest(req);
    let user = await jwt.getUserFromToken(userToken);

    if (!widgetsApi.isValidWidgetCode(req.body.widget.code))
        return res.status(400).json({message: 'Wrong widget code.'});
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    const widget = new WidgetModel({
        ...req.body.widget
    })
    try {
        await widget.save();
        let newWidgets = user.widgets;
        newWidgets.push(widget);
        console.log(widget);
        let savedUser = await User.findOneAndUpdate({_id: user._id}, {widgets: user.widgets});

        if (savedUser)
            return res.status(200).json({message: 'Widget successfuly created.'});
        else
            return res.status(500).json({message: 'Internal server error.'})
    } catch (err) {
        res.status(500).json({message: 'Internal server error.'});
    }
}

const updateWidget = async(req, res) => {
    let userToken = jwt.getTokenFromRequest(req);
    let user = await jwt.getUserFromToken(userToken);

    if (!req.body.id || !req.body.id.match(/^[0-9a-fA-F]{24}$/))
        return res.status(400).json({message: 'Invalid widget id.'});
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    let index = user.widgets.findIndex(widget => widget._id == req.body.id);

    user.widgets[index].config = req.body.config;
    let savedUser = await User.findOneAndUpdate({_id: user._id}, {widgets: user.widgets});

    if (!savedUser)
        return res.status(500).json({message: 'Internal server error.'})
    let savedWidget = await WidgetModel.findOneAndUpdate({_id: req.body.id}, {config: req.body.config});
    if (!savedWidget)
        return res.status(401).json({message: 'Failed to update widget.'});
    return res.status(200).json({message: 'Widget updated successfully.'});
}

const deleteWidget = async (req, res) => {
    let userToken = jwt.getTokenFromRequest(req);
    let user = await jwt.getUserFromToken(userToken);

    if (!req.body.id || !req.body.id.match(/^[0-9a-fA-F]{24}$/))
        return res.status(400).json({message: 'Invalid widget id.'});
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    filtered = user.widgets.filter(widget => widget._id != req.body.id);
    let savedUser = await User.findOneAndUpdate({_id: user._id}, {widgets: filtered});

    if (!savedUser)
        return res.status(500).json({message: 'Internal server error.'})
    try {
        await WidgetModel.deleteOne({_id: req.body.id});
        return res.status(200).json({message: 'Widget deleted successfully.'});
    } catch (err) {
        return res.status(404).json({message: 'Widget does not exist.'});
    }
}

module.exports = {
    getAllWidgetsConf,
    createWidget,
    updateWidget,
    deleteWidget
}
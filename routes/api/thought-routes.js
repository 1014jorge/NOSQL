const router = require("express").Router();
const { User, Thought } = require("../../models");


//api thoughts

router.get("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 })
        res.status(200).json(dbThoughtData);
    } catch (err) {
        res.status(404).json(err)
    }

})

router.post("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate({
            _id: req.body.userId,
        },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: `Thought created but no user with this ID` });
        }


        res.status(200).json({ ...dbThoughtData, message: `Thought successfully created` });
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get("/:thoughtId", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        if (!dbThoughtData) {
            return res.status(404).json({ message: `No thought with this ID` })
        }
        res.status(200).json(dbThoughtData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put("/:thoughtId", async (req, res) => {
    try {
        const dbThoughtData = Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought with this ID" })
        }
        res.json(dbThoughtData);

    } catch (err) {
        res.status(500).json(err)
    }

})
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {

    try {
    } catch (err) {

    }
})

router.post("/:thoughtId/reactions", async (req, res) => {
    try {
    } catch (err) {

    }

})
module.exports = router;
import dotenv from "dotenv";
dotenv.config();

const USER_ID = process.env.USER_ID;
const EMAIL_ID = process.env.EMAIL_ID;
const COLLEGE_ROLL_NUMBER = process.env.COLLEGE_ROLL_NUMBER;

const controller = (req, res) => {
    try {
        const inputArray = req.body.data;
        if (!Array.isArray(inputArray)) {
        return res
            .status(400)
            .json({ is_success: false, message: "Input must be an array" });
        }

        const oddNumbers = inputArray.filter(
        (x) => /^\d+$/.test(x) && parseInt(x) % 2 !== 0
        );
        const evenNumbers = inputArray.filter(
        (x) => /^\d+$/.test(x) && parseInt(x) % 2 === 0
        );

        const alphabets = inputArray.filter(
        (x) => typeof x === "string" && /^[a-zA-Z]+$/.test(x)
        );

        const specialChars = inputArray.filter(
        (x) => typeof x === "string" && /[^a-zA-Z0-9]/.test(x)
        );

        const sumOfNumbers = inputArray
        .reduce(
            (acc, x) => (/^\d+$/.test(x) ? acc + parseInt(x) : acc),
            0
        )
        .toString();

        const reversedConcat = alphabets.reverse().join("").toLowerCase();
        let alternatingCaps = "";
        for (let i = 0; i < reversedConcat.length; i++) {
        alternatingCaps +=
            i % 2 === 0
            ? reversedConcat[i].toUpperCase()
            : reversedConcat[i].toLowerCase();
        }

        console.log(req);

        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL_ID,
            roll_number: COLLEGE_ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets.map((ch) => ch.toUpperCase()),
            special_characters: specialChars,
            sum: sumOfNumbers,
            concat_string: alternatingCaps,
        });
    }
    catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
};

export default controller;

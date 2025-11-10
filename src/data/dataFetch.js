const DATA_URL = "/react-project/un_sustainability_goal_12.json";

// get examples
function getExamples(data) {
    const targetsArray = [];
    const examplesArray = [];
    data.forEach((target, tIndex) => {
        targetsArray.push({
            id: tIndex,
            number: target.number,
            description: target.description,
        });

        const targetId = tIndex;
        const examples = target.examples;

        examples.forEach((ex, eIndex) => {
            examplesArray.push({
                id: `${targetId}-e${eIndex}`, // target-example ID
                title: ex.title,
                description: ex.description,
                images: ex.images,
                tags: ex.tags,
                favourite: Math.random() < 0.5 ? "yes" : "no",
                rating: Math.floor(Math.random() * 6), // 0–5
                target: tIndex,
            });
        });
    });
    return [targetsArray, examplesArray];
}

// main fetch function
async function fetchData() {
    if (DATA_URL && DATA_URL.trim() !== "") {
        try {
            const res = await fetch(DATA_URL);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();

            let targets = data.goal.targets;
            return getExamples(targets);
        } catch (err) {
            console.log(err);
        }
    }
}

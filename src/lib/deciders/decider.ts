import Referee from "../referee";

class Decider {
    Referee: Referee;
    constructor(Referee: Referee){
        this.Referee = Referee;
    }
}
export default Decider;
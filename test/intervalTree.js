/**
 * Created by Alex Bol on 3/31/2017.
 */

import { expect } from "chai";
import IntervalTree from "../index";
import { Interval } from "../index";

// import IntervalTree from '../dist/interval-tree.esm';

describe("#IntervalTree", function () {
  it("Create new instanse of IntervalTree ", function () {
    let tree = new IntervalTree();
    expect(tree).to.be.an.instanceof(IntervalTree);
  });
  it("Size of empty tree will be 0", function () {
    let tree = new IntervalTree();
    expect(tree.size).to.equal(0);
  });
  it("May insert one entry with key - array of numbers", function () {
    let tree = new IntervalTree();
    tree.insert([1, 2]);
    expect(tree.size).to.equal(1);
  });
  it("May insert many entries with key - array of numbers", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let int of ints) tree.insert(int);
    expect(tree.size).to.equal(5);
  });
  it("May insert entries while transforming numeric pair into Interval", function () {
    let tree = new IntervalTree();
    let pairs = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let pair of pairs) tree.insert(new Interval(pair[0], pair[1]));
    expect(tree.size).to.equal(5);
    expect(tree.keys).to.deep.equal([
      [1, 1],
      [1, 4],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
  });
  it("May return array of keys sorted", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let int of ints) tree.insert(int);
    expect(tree.keys).to.deep.equal([
      [1, 1],
      [1, 4],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
  });
  it("May test if node entry exist after insertion", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.keys).to.deep.equal([
      [1, 1],
      [1, 4],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
    for (let i = 0; i < ints.length; i++) {
      expect(tree.exist(ints[i], "val" + i)).to.equal(true);
    }
  });
  it("May not find value when key was not inserted", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.exist([2, 4], "val")).to.be.false; // wrong interval
    expect(tree.exist([1, 4], "val2")).to.be.false; // wrong value
  });
  it("May not find entry after key was deleted", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    tree.remove([1, 4], "val1");

    expect(tree.size).to.equal(4);
    expect(tree.keys).to.deep.equal([
      [1, 1],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
    expect(tree.exist([1, 4])).to.be.false;
  });
  it("May become empty after all entries will be deleted", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    tree.remove([6, 8], "val0");
    tree.remove([1, 4], "val1");
    tree.remove([5, 12], "val2");
    tree.remove([1, 1], "val3");
    tree.remove([5, 7], "val4");

    expect(tree.size).to.equal(0);
    expect(tree.isEmpty()).to.be.true;
  });
  it("May return array of items", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);

    let items = tree.items;
    let keys = [];
    for (let item of items) {
      keys.push(item);
    }
    expect(items.length).to.equal(5);
    expect(keys.length).to.equal(5);
    expect(tree.keys).to.deep.equal([
      [1, 1],
      [1, 4],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
  });
  it("May transform tree to another tree using map", function () {
    let tree1 = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree1.insert(ints[i], "val" + i);

    let tree2 = tree1.map((value, key) => key.high - key.low);

    expect(tree2.size).to.equal(5);
    expect(tree2.keys).to.deep.equal([
      [1, 1],
      [1, 4],
      [5, 7],
      [5, 12],
      [6, 8],
    ]);
    expect(tree2.values).to.deep.equal([0, 3, 2, 7, 2]);
  });

  it("May search interval and return array of values", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 4],
      [5, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.search([2, 3])).to.deep.equal(["val1"]);
  });
  it("May search interval and return array of custom transformed objects", function () {
    const composers = [
      { name: "Ludwig van Beethoven", period: [1770, 1827] },
      { name: "Johann Sebastian Bach", period: [1685, 1750] },
      { name: "Wolfgang Amadeus Mozart", period: [1756, 1791] },
      { name: "Johannes Brahms", period: [1833, 1897] },
      { name: "Richard Wagner", period: [1813, 1883] },
      { name: "Claude Debussy", period: [1862, 1918] },
      { name: "Pyotr Ilyich Tchaikovsky", period: [1840, 1893] },
      { name: "Frédéric Chopin", period: [1810, 1849] },
      { name: "Joseph Haydn", period: [1732, 1809] },
      { name: "Antonio Vivaldi", period: [1678, 1741] },
    ];
    const tree = new IntervalTree();
    for (let composer of composers) tree.insert(composer.period, composer.name);

    const searchRes = tree.search([1600, 1700], (name, period) => {
      return `${name} (${period.low}-${period.high})`;
    });
    expect(searchRes.length).to.equal(2);
    expect(searchRes[0]).to.equal("Antonio Vivaldi (1678-1741)");
    expect(searchRes[1]).to.equal("Johann Sebastian Bach (1685-1750)");
  });
  it("May return empty array when search interval does not intersect any", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 2],
      [7, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.search([3, 4])).to.deep.equal([]);
  });
  it("Each red node has exactly two black child nodes", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 2],
      [7, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.testRedBlackProperty()).to.equal(true);
  });
  it("Each path from root to nil node has same black height", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 2],
      [7, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    let height = (tree) => {
      return tree.testBlackHeightProperty(tree.root);
    };
    expect(height(tree)).to.equal(3);
  });
  it("Same black height property preserved while nodes deleted", function () {
    let tree = new IntervalTree();
    let ints = [
      [6, 8],
      [1, 2],
      [7, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    let height = (tree) => {
      return tree.testBlackHeightProperty(tree.root);
    };
    let h;
    tree.remove([1, 1], "val3");
    // h = height(tree);
    expect(height(tree)).to.equal(3);
    expect(tree.testRedBlackProperty()).to.equal(true);

    tree.remove([5, 7], "val4");
    expect(height(tree)).to.equal(3);
    expect(tree.testRedBlackProperty()).to.equal(true);

    tree.remove([1, 2], "val1");
    expect(tree.testRedBlackProperty()).to.equal(true);
    expect(height(tree)).to.equal(2);

    tree.remove([6, 8], "val0");
    expect(tree.testRedBlackProperty()).to.equal(true);
    expect(height(tree)).to.equal(2);

    tree.remove([7, 12], "val2");
    expect(tree.testRedBlackProperty()).to.equal(true);
  });
  it("Fix issue #9", function () {
    function setupTreeAndSearch(intervals, searchInterval) {
      let tree = new IntervalTree();

      for (let i = 0; i < intervals.length; i++) {
        tree.insert(intervals[i], "val" + i);
      }

      return tree.search(searchInterval);
    }

    let resp1 = setupTreeAndSearch(
      [
        [1, 1],
        [1, 4],
        [5, 6],
        [5.5, 7],
        [7, 8],
      ],
      [5.5, 5.7]
    );
    expect(resp1).to.be.deep.equal(["val2", "val3"]);

    let resp2 = setupTreeAndSearch(
      [
        [1, 1],
        [1, 4],
        [5, 6],
        [6, 7],
        [7, 8],
      ],
      [5.5, 5.7]
    );
    expect(resp2).to.be.deep.equal(["val2"]);
  });
  it("Low or high can be 0", function () {
    let tree = new IntervalTree();
    let ints = [
      [0, 0],
      [0, 0],
      [1, 1],
      [0, 0],
    ];
    for (let i = 0; i < ints.length; i++) tree.insert(ints[i], "val" + i);
    expect(tree.search([0, 0])).to.deep.equal(["val0", "val1", "val3"]);
  });
  it("Fix issue #15 Unable to remove/find some of the nodes", function () {
    const intervalTree3 = new IntervalTree();

    intervalTree3.insert([2, 5], 10);
    intervalTree3.insert([2, 5], 20);
    intervalTree3.insert([2, 5], 30);
    intervalTree3.insert([2, 5], 40);
    intervalTree3.insert([2, 5], 50);

    expect(intervalTree3.exist([2, 5], 10)).to.be.true;
    expect(intervalTree3.exist([2, 5], 20)).to.be.true;
    expect(intervalTree3.exist([2, 5], 30)).to.be.true;
    expect(intervalTree3.exist([2, 5], 40)).to.be.true;
    expect(intervalTree3.exist([2, 5], 50)).to.be.true;
    expect(intervalTree3.exist([2, 5], 25)).to.be.false;
  });
  it("Fix issue #16 Storing '0' as a key value will return a key pair when searching ", function () {
    const tree = new IntervalTree();
    tree.insert([0, 0], 0);
    tree.insert([0, 0], 1);

    let resp1 = tree.search([0, 0]);
    expect(resp1).to.deep.equal([0, 1]);

    tree.remove([0, 0], 1);

    expect(tree.exist([0, 0], 0)).to.be.true;
    expect(tree.exist([0, 0], 1)).to.be.false;

    let resp2 = tree.search([0, 0]);

    expect(resp2).to.deep.equal([0]);
  });
  it("May store any falsy values: 0, false, NaN, null ", function () {
    const tree = new IntervalTree();
    tree.insert([0, 0], 0);
    tree.insert([0, 0], false);
    tree.insert([0, 0], NaN);
    tree.insert([0, 0], null);

    let resp1 = tree.search([0, 0]);
    expect(resp1).to.deep.equal([0, false, NaN, null]);
  });
  it("Cannot store undefined value", function () {
    const tree = new IntervalTree();
    tree.insert([0, 0], undefined);

    let resp1 = tree.search([0, 0]);
    expect(resp1).to.deep.equal([[0, 0]]);
  });
  it("May search interval and return true if intersection with any interval found. Issue #26", function () {
    let tree = new IntervalTree();
    let intervals = [
      [7, 8],
      [1, 4],
      [11, 12],
      [1, 1],
      [5, 7],
    ];
    for (let i = 0; i < intervals.length; i++)
      tree.insert(intervals[i], "val" + i);
    expect(tree.intersect_any([2, 3])).to.be.true;
    expect(tree.intersect_any([4, 4])).to.be.true;
    expect(tree.intersect_any([4, 10])).to.be.true;
    expect(tree.intersect_any([9, 10])).to.be.false;
    expect(tree.intersect_any([-1, 0])).to.be.false;
    expect(tree.intersect_any([15, 20])).to.be.false;
  });
  it("May test if any of great composers lived in second half of XX century", function () {
    const composers = [
      { name: "Ludwig van Beethoven", period: [1770, 1827] },
      { name: "Johann Sebastian Bach", period: [1685, 1750] },
      { name: "Wolfgang Amadeus Mozart", period: [1756, 1791] },
      { name: "Johannes Brahms", period: [1833, 1897] },
      { name: "Richard Wagner", period: [1813, 1883] },
      { name: "Claude Debussy", period: [1862, 1918] },
      { name: "Pyotr Ilyich Tchaikovsky", period: [1840, 1893] },
      { name: "Frédéric Chopin", period: [1810, 1849] },
      { name: "Joseph Haydn", period: [1732, 1809] },
      { name: "Antonio Vivaldi", period: [1678, 1741] },
    ];
    const tree = new IntervalTree();
    for (let composer of composers) tree.insert(composer.period, composer.name);
    expect(tree.intersect_any([1950, 2000])).to.be.false;
  });
  it("May inherit Interval class and override its methods ", function () {
    class TimeInterval extends Interval {
      not_intersect(other_interval) {
        return (
          this.high <= other_interval.low || other_interval.high <= this.low
        );
      }
    }
    const tree = new IntervalTree();
    tree.insert(new TimeInterval(7, 8));
    tree.insert(new TimeInterval(1, 4));
    tree.insert(new TimeInterval(11, 12));
    tree.insert(new TimeInterval(5, 7));

    const resp1 = tree.search([4, 5]);
    expect(resp1).to.deep.equal([]);

    const resp2 = tree.search([4, 11]);
    expect(resp2).to.deep.equal([
      [5, 7],
      [7, 8],
    ]);
  });
  it("May remove interval and return the removed entries", function () {
    const intervalTree3 = new IntervalTree();

    const ins = () => {
      intervalTree3.clear();
      intervalTree3.insert([1, 5], 10);
      intervalTree3.insert([2, 2], 20);
      intervalTree3.insert([3, 6], 30);
      intervalTree3.insert([1, 2], 40);
      intervalTree3.insert([4, 10], 50);
    };

    ins();

    expect(intervalTree3.removeInterval([2, 5]).sort()).to.deep.equal(
      [20, 10, 40, 50, 30].sort()
    );
    ins();

    expect(intervalTree3.removeInterval([2, 1000000]).length).to.equal(5);
    ins();
    expect(intervalTree3.removeInterval([0, 1000000]).length).to.equal(5);
    ins();
    expect(intervalTree3.removeInterval([2, 2]).sort()).to.deep.equal(
      [10, 20, 40].sort()
    );
    expect(intervalTree3.removeInterval([9, 10]).sort()).to.deep.equal(
      [50].sort()
    );
    ins();
    expect(intervalTree3.removeInterval([2, 3]).sort()).to.not.contain(50);
    ins();
    expect(intervalTree3.removeInterval([2, 5]).sort()).to.contain(50);
    ins();
  });

  it("May remove interval and return the removed entries 2", function () {
    const intervalTree3 = new IntervalTree();
    const intervals = [
      [13, 14],
      [31, 38],
      [195, 198],
      [341, 350],
      [341, 352],
      [381, 385],
      [530, 537],
      [695, 704],
      [859, 866],
      [1017, 1021],
      [1030, 1039],
      [1087, 1094],
      [1142, 1151],
      [1365, 1372],
      [1468, 1471],
      [1531, 1534],
      [1531, 1534],
      [1652, 1656],
      [1673, 1682],
      [1673, 1684],
      [1840, 1847],
      [1880, 1889],
      [1880, 1891],
      [2162, 2169],
      [2162, 2171],
      [2707, 2714],
      [2756, 2759],
      [2756, 2759],
      [2862, 2869],
      [3072, 3079],
      [3140, 3144],
      [3174, 3179],
      [3253, 3260],
      [3384, 3387],
      [3518, 3521],
      [3518, 3521],
      [3714, 3721],
      [3759, 3762],
      [3759, 3762],
      [4197, 4200],
      [4204, 4207],
      [4219, 4222],
      [4277, 4284],
      [4419, 4422],
      [4419, 4422],
      [4431, 4441],
      [4534, 4538],
      [4551, 4556],
      [4567, 4572],
      [4607, 4610],
      [4607, 4610],
      [4839, 4848],
      [4854, 4861],
      [5041, 5044],
      [5041, 5044],
      [5198, 5202],
      [5207, 5212],
      [5228, 5235],
      [5318, 5321],
      [5356, 5359],
      [5356, 5359],
      [5448, 5455],
      [5678, 5681],
      [5678, 5681],
      [5770, 5777],
      [5819, 5822],
      [6063, 6066],
      [6063, 6066],
      [6652, 6655],
      [6652, 6655],
      [6656, 6661],
      [6943, 6949],
      [6968, 6975],
      [7183, 7187],
      [7190, 7196],
      [7199, 7202],
      [7241, 7247],
      [7399, 7403],
      [7532, 7541],
      [7545, 7554],
      [7769, 7773],
      [8504, 8506],
      [9107, 9112],
      [9224, 9229],
      [9446, 9450],
      [9506, 9510],
      [9516, 9517],
      [10113, 10117],
      [10142, 10145],
      [10207, 10216],
      [10207, 10218],
      [10236, 10245],
      [10942, 10951],
      [11019, 11023],
      [11264, 11273],
      [11356, 11365],
      [11648, 11652],
      [11708, 11717],
      [11806, 11815],
      [11913, 11922],
      [12035, 12039],
      [12201, 12210],
      [12286, 12289],
      [12501, 12510],
      [12634, 12639],
      [12643, 12650],
      [12651, 12658],
      [12681, 12690],
      [12681, 12692],
      [12757, 12766],
      [13025, 13032],
      [13025, 13034],
      [13057, 13061],
      [13066, 13068],
      [13076, 13083],
      [13146, 13155],
      [13262, 13267],
      [13293, 13302],
      [13428, 13435],
      [13634, 13639],
      [13663, 13669],
      [13716, 13725],
      [13884, 13889],
      [13896, 13903],
      [13907, 13914],
      [13907, 13916],
      [13968, 13977],
      [14011, 14017],
      [14219, 14223],
      [14404, 14409],
      [14453, 14462],
      [14500, 14507],
      [14674, 14681],
      [14750, 14755],
      [14750, 14757],
      [14767, 14770],
      [14773, 14778],
      [14829, 14835],
      [14960, 14967],
      [14976, 14985],
      [15186, 15191],
      [15209, 15218],
      [15247, 15252],
      [15278, 15287],
      [15369, 15377],
      [15400, 15405],
      [15410, 15419],
      [15410, 15421],
      [15469, 15477],
      [15469, 15479],
      [15505, 15510],
      [15505, 15512],
      [15551, 15553],
      [15614, 15621],
      [15614, 15623],
      [15717, 15722],
      [15875, 15884],
      [15875, 15886],
      [16063, 16068],
      [16063, 16070],
      [16100, 16107],
      [16252, 16257],
      [16252, 16259],
      [16322, 16331],
      [16471, 16480],
      [16497, 16506],
      [16552, 16559],
      [16613, 16615],
      [16634, 16643],
      [16669, 16676],
      [16704, 16713],
      [16932, 16939],
      [17105, 17110],
      [17147, 17156],
      [17330, 17337],
      [17330, 17339],
      [17394, 17399],
      [17524, 17533],
      [17587, 17592],
      [17699, 17706],
      [18043, 18052],
      [18043, 18054],
      [18063, 18069],
      [18070, 18077],
      [18080, 18089],
      [18149, 18156],
      [18349, 18356],
      [18516, 18521],
      [18562, 18563],
      [18598, 18605],
      [18598, 18607],
      [18727, 18734],
      [19022, 19027],
      [19192, 19199],
      [19297, 19302],
      [19535, 19542],
      [19743, 19752],
      [19848, 19856],
      [19856, 19858],
      [19860, 19869],
      [19860, 19871],
      [20020, 20027],
      [20105, 20110],
      [20121, 20128],
      [20332, 20343],
      [20360, 20365],
      [20385, 20394],
      [20466, 20471],
      [20573, 20577],
      [20635, 20642],
      [20635, 20644],
      [20715, 20720],
      [20747, 20756],
      [20747, 20758],
      [20823, 20832],
      [20879, 20881],
      [20911, 20916],
      [20939, 20948],
      [20939, 20950],
      [21030, 21039],
      [21084, 21095],
      [21116, 21121],
      [21188, 21195],
      [21225, 21236],
      [21307, 21314],
      [21578, 21583],
      [21599, 21606],
      [21756, 21765],
      [21804, 21816],
      [21848, 21857],
      [21873, 21878],
      [21873, 21880],
      [22083, 22090],
      [22226, 22235],
      [22396, 22401],
      [22657, 22666],
      [23215, 23222],
      [23233, 23240],
      [23237, 23240],
      [23445, 23450],
      [23595, 23602],
      [23838, 23843],
      [24109, 24116],
      [24125, 24127],
      [24128, 24131],
      [24153, 24156],
      [24157, 24167],
      [24168, 24172],
      [24323, 24330],
      [24323, 24332],
      [24340, 24347],
      [24444, 24449],
    ];

    const ins = () => {
      intervalTree3.clear();
      intervals.forEach((v, i) => intervalTree3.insert(v, i));
    };

    ins();
    expect(intervalTree3.removeInterval([24157, 1000000]).length).to.equal(
      750 - 744
    );
    expect(intervalTree3.items.length).to.equal(750 - 497 - (750 - 744));
    ins();
    expect(intervalTree3.removeInterval([9516, 1000000]).length).to.equal(
      750 - 584
    );
    ins();
  });
});

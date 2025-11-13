// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 回到顶部按钮显示/隐藏
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// 移动端菜单切换
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 移动端点击后关闭菜单
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// 回到顶部
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 时间线动画
function checkTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.85) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkTimelineVisibility);
window.addEventListener('load', checkTimelineVisibility);

// 知识图谱实现
document.addEventListener('DOMContentLoaded', function() {
    // 示例超声知识图谱数据
    const graphData = {
        nodes: [
            { id: "ultrasound", name: "超声成像", category: "root", description: "医学超声成像技术" },
            { id: "principles", name: "物理原理", category: "category", description: "超声成像的基本物理原理" },
            { id: "equipment", name: "成像设备", category: "category", description: "超声设备与探头类型" },
            { id: "modes", name: "成像模式", category: "category", description: "不同类型的超声成像模式" },
            { id: "anatomy", name: "人体解剖", category: "category", description: "超声相关的解剖结构" },
            { id: "applications", name: "临床应用", category: "category", description: "超声在不同临床领域的应用" },
            { id: "terms", name: "技术术语", category: "category", description: "超声技术术语与缩写" },
            
            // 物理原理子节点
            { id: "pulse-echo", name: "脉冲-回波原理", category: "concept", description: "超声成像的基本原理" },
            { id: "acoustic-impedance", name: "声阻抗", category: "concept", description: "介质对声波传播的阻力" },
            { id: "reflection", name: "反射/折射", category: "concept", description: "声波在组织界面的行为" },
            { id: "attenuation", name: "衰减", category: "concept", description: "声波在组织中传播时的能量损失" },
            { id: "piezoelectric", name: "压电效应", category: "concept", description: "探头工作的基本原理" },
            
            // 成像设备子节点
            { id: "linear", name: "线阵探头", category: "concept", description: "用于浅表器官成像" },
            { id: "convex", name: "凸阵探头", category: "concept", description: "用于腹部成像" },
            { id: "phased", name: "相控阵探头", category: "concept", description: "用于心脏成像" },
            { id: "endo", name: "腔内探头", category: "concept", description: "用于腔内超声检查" },
            
            // 成像模式子节点
            { id: "b-mode", name: "B型超声", category: "concept", description: "二维灰阶成像，基础模式" },
            { id: "color-doppler", name: "彩色多普勒", category: "concept", description: "显示血流方向与速度" },
            { id: "spectral-doppler", name: "频谱多普勒", category: "concept", description: "定量测量血流速度" },
            { id: "m-mode", name: "M型超声", category: "concept", description: "记录运动界面的时间-运动曲线" },
            { id: "elastography", name: "弹性成像", category: "concept", description: "评估组织硬度" },
            
            // 临床应用子节点
            { id: "abdominal", name: "腹部超声", category: "application", description: "肝、胆、胰、脾、肾等脏器检查" },
            { id: "cardiac", name: "心血管超声", category: "application", description: "心脏结构与功能评估" },
            { id: "thyroid", name: "甲状腺超声", category: "application", description: "甲状腺结构与病变评估" },
            { id: "ob-gyn", name: "产科与妇科超声", category: "application", description: "妊娠评估与妇科疾病诊断" },
            
            // 技术术语子节点
            { id: "cdfi", name: "CDFI", category: "term", description: "彩色多普勒血流成像" },
            { id: "pw", name: "PW", category: "term", description: "脉冲波多普勒" },
            { id: "cw", name: "CW", category: "term", description: "连续波多普勒" },
            { id: "tgc", name: "TGC", category: "term", description: "时间增益补偿" },
            { id: "hifu", name: "HIFU", category: "term", description: "高强度聚焦超声" }
        ],
        links: [
            { source: "ultrasound", target: "principles" },
            { source: "ultrasound", target: "equipment" },
            { source: "ultrasound", target: "modes" },
            { source: "ultrasound", target: "anatomy" },
            { source: "ultrasound", target: "applications" },
            { source: "ultrasound", target: "terms" },
            
            // 物理原理链接
            { source: "principles", target: "pulse-echo" },
            { source: "principles", target: "acoustic-impedance" },
            { source: "principles", target: "reflection" },
            { source: "principles", target: "attenuation" },
            { source: "principles", target: "piezoelectric" },
            
            // 成像设备链接
            { source: "equipment", target: "linear" },
            { source: "equipment", target: "convex" },
            { source: "equipment", target: "phased" },
            { source: "equipment", target: "endo" },
            
            // 成像模式链接
            { source: "modes", target: "b-mode" },
            { source: "modes", target: "color-doppler" },
            { source: "modes", target: "spectral-doppler" },
            { source: "modes", target: "m-mode" },
            { source: "modes", target: "elastography" },
            
            // 临床应用链接
            { source: "applications", target: "abdominal" },
            { source: "applications", target: "cardiac" },
            { source: "applications", target: "thyroid" },
            { source: "applications", target: "ob-gyn" },
            
            // 技术术语链接
            { source: "terms", target: "cdfi" },
            { source: "terms", target: "pw" },
            { source: "terms", target: "cw" },
            { source: "terms", target: "tgc" },
            { source: "terms", target: "hifu" },
            
            // 交叉链接
            { source: "b-mode", target: "abdominal" },
            { source: "color-doppler", target: "cardiac" },
            { source: "elastography", target: "thyroid" },
            { source: "linear", target: "thyroid" },
            { source: "convex", target: "abdominal" },
            { source: "phased", target: "cardiac" }
        ]
    };

    // 设置力导向图
    const width = document.getElementById('graph-container').clientWidth;
    const height = document.getElementById('graph-container').clientHeight;

    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");

    // 颜色比例尺
    const colorScale = d3.scaleOrdinal()
        .domain(["root", "category", "concept", "application", "term"])
        .range(["#165DFF", "#36CFC9", "#FF7D00", "#9FDB1D", "#F53F3F"]);

    // 力模拟
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(50));

    // 连线
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 2);

    // 节点
    const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graphData.nodes)
        .enter().append("g")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // 节点圆圈
    node.append("circle")
        .attr("r", d => {
            if (d.category === "root") return 20;
            if (d.category === "category") return 15;
            return 10;
        })
        .attr("fill", d => colorScale(d.category))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .on("mouseover", showNodeInfo)
        .on("mouseout", hideNodeInfo)
        .on("click", toggleNodeExpansion);

    // 节点标签
    node.append("text")
        .text(d => d.name)
        .attr("x", 0)
        .attr("y", d => {
            if (d.category === "root") return 30;
            if (d.category === "category") return 22;
            return 15;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", d => {
            if (d.category === "root") return "14px";
            if (d.category === "category") return "12px";
            return "10px";
        })
        .attr("font-weight", d => d.category === "root" ? "bold" : "normal")
        .attr("fill", "#333");

    // 节点信息显示
    function showNodeInfo(event, d) {
        d3.select("#node-info")
            .style("display", "block")
            .html(`<h4>${d.name}</h4><p>${d.description}</p>`);
    }

    function hideNodeInfo() {
        d3.select("#node-info").style("display", "none");
    }

    // 节点展开/折叠功能
    function toggleNodeExpansion(event, d) {
        // 简化实现：切换节点的可见性
        const isVisible = d3.select(this.parentNode).style("display") !== "none";
        
        if (isVisible) {
            // 隐藏该节点的所有连接节点
            const connectedNodes = getConnectedNodes(d.id);
            connectedNodes.forEach(nodeId => {
                d3.selectAll(".nodes g").filter(n => n.id === nodeId)
                    .transition()
                    .duration(500)
                    .style("opacity", 0.3);
            });
            
            // 隐藏连接线
            d3.selectAll(".links line")
                .filter(l => l.source.id === d.id || l.target.id === d.id)
                .transition()
                .duration(500)
                .style("opacity", 0.3);
        } else {
            // 显示所有节点和连接线
            d3.selectAll(".nodes g, .links line")
                .transition()
                .duration(500)
                .style("opacity", 1);
        }
    }

    function getConnectedNodes(nodeId) {
        const connected = [];
        graphData.links.forEach(link => {
            if (link.source.id === nodeId) connected.push(link.target.id);
            if (link.target.id === nodeId) connected.push(link.source.id);
        });
        return connected;
    }

    // 拖拽功能
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // 更新力模拟
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // 缩放功能
    const zoom = d3.zoom()
        .scaleExtent([0.5, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    // 搜索功能
    document.getElementById("search-input").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        
        node.each(function(d) {
            const isMatch = d.name.toLowerCase().includes(searchTerm) || 
                           d.description.toLowerCase().includes(searchTerm);
            
            d3.select(this)
                .transition()
                .duration(300)
                .style("opacity", isMatch ? 1 : 0.2);
            
            d3.select(this).select("circle")
                .transition()
                .duration(300)
                .attr("r", isMatch ? 
                    (d.category === "root" ? 25 : 
                     d.category === "category" ? 18 : 13) : 
                    (d.category === "root" ? 20 : 
                     d.category === "category" ? 15 : 10));
        });
        
        link.each(function(d) {
            const sourceMatch = d.source.name.toLowerCase().includes(searchTerm) || 
                              d.source.description.toLowerCase().includes(searchTerm);
            const targetMatch = d.target.name.toLowerCase().includes(searchTerm) || 
                              d.target.description.toLowerCase().includes(searchTerm);
            
            d3.select(this)
                .transition()
                .duration(300)
                .style("opacity", (sourceMatch || targetMatch) ? 1 : 0.1)
                .attr("stroke-width", (sourceMatch || targetMatch) ? 3 : 2);
        });
    });

    // 重置视图
    document.getElementById("reset-view").addEventListener("click", function() {
        simulation.alpha(1).restart();
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
        
        node.style("opacity", 1)
            .select("circle")
            .attr("r", d => {
                if (d.category === "root") return 20;
                if (d.category === "category") return 15;
                return 10;
            });
        
        link.style("opacity", 0.6)
            .attr("stroke-width", 2);
        
        document.getElementById("search-input").value = "";
    });

    // 展开所有节点
    document.getElementById("expand-all").addEventListener("click", function() {
        node.style("opacity", 1);
        link.style("opacity", 0.6);
    });

    // 折叠所有节点（隐藏细节）
    document.getElementById("collapse-all").addEventListener("click", function() {
        node.each(function(d) {
            const isMain = d.category === "root" || d.category === "category";
            d3.select(this).style("opacity", isMain ? 1 : 0.3);
        });
        
        link.each(function(d) {
            const sourceMain = d.source.category === "root" || d.source.category === "category";
            const targetMain = d.target.category === "root" || d.target.category === "category";
            d3.select(this).style("opacity", (sourceMain && targetMain) ? 0.6 : 0.2);
        });
    });

    // 窗口大小调整
    window.addEventListener('resize', function() {
        const newWidth = document.getElementById('graph-container').clientWidth;
        const newHeight = document.getElementById('graph-container').clientHeight;
        
        svg.attr("width", newWidth).attr("height", newHeight);
        simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.alpha(0.3).restart();
    });
});